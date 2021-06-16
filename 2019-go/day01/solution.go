package day01

import (
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

func calculateFuel(mass int) int {
	if amount := mass/3 - 2; amount < 0 {
		return 0
	} else {
		return amount
	}

}

func calculateTotalFuel(mass int) int {
	fuel := calculateFuel(mass)
	totalFuel := fuel
	for fuel > 0 {
		fuel = calculateFuel(fuel)
		totalFuel += fuel
	}
	return totalFuel
}

func Part1(input string) int {
	content, err := ioutil.ReadFile(input)
	if err != nil {
		log.Fatal(err)
	}
	totalMass := 0
	data := strings.Split(string(content), "\n")
	for _, mass := range data {
		massInt, err := strconv.Atoi(mass)
		if err != nil {
			log.Fatal(err)
		} else {
			totalMass += calculateFuel(massInt)
		}
	}
	return totalMass
}

func Part2(input string) int {
	content, err := ioutil.ReadFile(input)
	if err != nil {
		log.Fatal(err)
	}
	totalMass := 0
	data := strings.Split(string(content), "\n")
	for _, mass := range data {
		massInt, err := strconv.Atoi(mass)
		if err != nil {
			log.Fatal(err)
		} else {
			totalMass += calculateTotalFuel(massInt)
		}
	}
	return totalMass
}
