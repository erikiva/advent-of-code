package day05

import (
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

type Instruction struct {
	opcode int
	first  int
	second int
	third  int
}

func decodeInstruction(instruction int) Instruction {
	return Instruction{opcode: instruction % 100,
		first:  instruction / 100 % 10,
		second: instruction / 1000 % 10,
		third:  instruction / 10000 % 10}

}

func getValue(instructions []int, mode int, value int) int {
	if mode == 0 {
		return instructions[value]
	} else {
		return value
	}
}

func processInstructions(instructions []int, input int) int {
	pc := 0
	output := 0
	for instructions[pc] != 99 {
		instruction := decodeInstruction(instructions[pc])
		switch instruction.opcode {
		// addition
		case 1:
			{

				instructions[instructions[pc+3]] = getValue(instructions, instruction.first, instructions[pc+1]) + getValue(instructions, instruction.second, instructions[pc+2])
				pc += 4
			}
			// multiplication
		case 2:
			{
				instructions[instructions[pc+3]] = getValue(instructions, instruction.first, instructions[pc+1]) * getValue(instructions, instruction.second, instructions[pc+2])
				pc += 4
			}
			// input
		case 3:
			{
				instructions[instructions[pc+1]] = input
				pc += 2
			}
			// output
		case 4:
			{
				output = getValue(instructions, instruction.first, instructions[pc+1])
				pc += 2
			}
			// jump-if-true
		case 5:
			{
				first := getValue(instructions, instruction.first, instructions[pc+1])
				if first != 0 {
					second := getValue(instructions, instruction.second, instructions[pc+2])
					pc = second
				} else {
					pc += 3
				}
			}
			// jump-if-false
		case 6:
			{
				first := getValue(instructions, instruction.first, instructions[pc+1])
				if first == 0 {
					second := getValue(instructions, instruction.second, instructions[pc+2])
					pc = second
				} else {
					pc += 3
				}
			}
			// less than
		case 7:
			{
				first := getValue(instructions, instruction.first, instructions[pc+1])
				second := getValue(instructions, instruction.second, instructions[pc+2])
				if first < second {
					instructions[instructions[pc+3]] = 1
				} else {
					instructions[instructions[pc+3]] = 0
				}
				pc += 4
			}
			// equals
		case 8:
			{
				first := getValue(instructions, instruction.first, instructions[pc+1])
				second := getValue(instructions, instruction.second, instructions[pc+2])
				if first == second {
					instructions[instructions[pc+3]] = 1
				} else {
					instructions[instructions[pc+3]] = 0
				}
				pc += 4
			}

		default:
			panic("Too far away.")
		}

	}
	fmt.Printf("%v", instructions)
	return output
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

func Part1(filename string, input int) int {
	instructions := getInstructions(filename)

	return processInstructions(instructions, input)
}

func Part2(filename string, input int) int {
	instructions := getInstructions(filename)

	return processInstructions(instructions, input)
}
