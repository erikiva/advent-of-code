package day02

import (
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

func processIntcode(instructions []int) int {
	pc := 0
	for instructions[pc] != 99 {
		switch instructions[pc] {
		case 1:
			{
				instructions[instructions[pc+3]] = instructions[instructions[pc+1]] + instructions[instructions[pc+2]]
				pc += 4
			}
		case 2:
			{
				instructions[instructions[pc+3]] = instructions[instructions[pc+1]] * instructions[instructions[pc+2]]
				pc += 4
			}
		default:
			panic("Too far away.")
		}

	}
	return instructions[0]
}

func getInstructions(input string) []int {
	content, err := ioutil.ReadFile(input)
	if err != nil {
		log.Fatal(err)
	}
	str_instructions := strings.Split(string(content), ",")
	var instructions = make([]int, len(str_instructions))

	for idx, i := range str_instructions {
		j, err := strconv.Atoi(i)
		if err != nil {
			panic(err)
		}
		instructions[idx] = j
	}
	return instructions
}

func Part1(input string) int {
	instructions := getInstructions(input)
	instructions[1] = 12
	instructions[2] = 2

	return processIntcode(instructions)
}

func Part2(input string) int {
	instructions := getInstructions(input)
	temp := make([]int, len(instructions))
	// for out != 19690720 {
	for noun := 0; noun < 100; noun++ {
		for verb := 0; verb < 100; verb++ {
			copy(temp, instructions)
			temp[1] = noun
			temp[2] = verb
			if processIntcode(temp) == 19690720 {
				return 100*noun + verb
			}
		}
	}
	return 0
}
