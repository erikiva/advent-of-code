package day03

import (
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"strconv"
	"strings"
)

type Position struct {
	X int
	Y int
}

func (pos Position) distance() int {
	return abs(pos.X) + abs(pos.Y)
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func addSteps(path map[Position]int, current Position, pasos int, move string) (Position, int) {
	direction := move[:1]
	steps, _ := strconv.Atoi(move[1:])
	for step := 0; step < steps; step++ {
		switch direction {
		case "R":
			current.X++
		case "L":
			current.X--
		case "U":
			current.Y++
		case "D":
			current.Y--
		}
		pasos++
		path[current] = pasos
	}
	return current, pasos
}

func getPath(cable []string) map[Position]int {
	pos := Position{0, 0}
	pasos := 0
	path := make(map[Position]int)
	for _, move := range cable {
		pos, pasos = addSteps(path, pos, pasos, move)
	}
	return path
}

func getSteps(c1 []string, c2 []string) int {
	path1 := getPath(c1)
	path2 := getPath(c2)
	closest := math.MaxInt32
	for key, _ := range path1 {
		if _, ok := path2[key]; ok {
			fmt.Printf("Found intersection %v %v\n", key, key.distance())
			if key.distance() < closest {
				closest = key.distance()
			}
		}
	}

	return closest
}

func Part1(input string) int {
	content, err := ioutil.ReadFile(input)
	if err != nil {
		log.Fatal(err)
	}
	cables := strings.Split(string(content), "\n")
	cable1 := strings.Split(cables[0], ",")
	cable2 := strings.Split(cables[1], ",")

	return getSteps(cable1, cable2)
}

func getSteps2(c1 []string, c2 []string) int {
	path1 := getPath(c1)
	path2 := getPath(c2)
	closest := math.MaxInt32
	for key, val1 := range path1 {
		if val2, ok := path2[key]; ok {
			fmt.Printf("Found intersection %v %v\n", key, val1+val2)
			if val1+val2 < closest {
				closest = val1 + val2
			}
		}
	}

	return closest
}

func Part2(input string) int {
	content, err := ioutil.ReadFile(input)
	if err != nil {
		log.Fatal(err)
	}
	cables := strings.Split(string(content), "\n")
	cable1 := strings.Split(cables[0], ",")
	cable2 := strings.Split(cables[1], ",")

	return getSteps2(cable1, cable2)
}
