package day03

import "testing"

func TestPart1Example00(t *testing.T) {
	want := 6
	if got := getSteps([]string{"R8", "U5", "L5", "D3"},
		[]string{"U7", "R6", "D4", "L4"}); got != want {
		t.Errorf("getSteps() = %v, want %v", got, want)
	}
}

func TestPart1Example01(t *testing.T) {
	want := 159
	if got := getSteps([]string{"R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"},
		[]string{"U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"}); got != want {
		t.Errorf("getSteps() = %v, want %v", got, want)
	}
}

func TestPart1Example02(t *testing.T) {
	want := 135
	if got := getSteps([]string{"R98", "U47", "R26", "D63", "R33", "U87", "L62", "D20", "R33", "U53", "R51"},
		[]string{"U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"}); got != want {
		t.Errorf("getSteps() = %v, want %v", got, want)
	}
}

func TestPart1(t *testing.T) {
	want := 5357
	if got := Part1("input.txt"); got != want {
		t.Errorf("Part1() = %v, want %v", got, want)
	}
}

func TestPart2Example00(t *testing.T) {
	want := 30
	if got := getSteps2([]string{"R8", "U5", "L5", "D3"},
		[]string{"U7", "R6", "D4", "L4"}); got != want {
		t.Errorf("getSteps2() = %v, want %v", got, want)
	}
}

func TestPart2Example01(t *testing.T) {
	want := 610
	if got := getSteps2([]string{"R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"},
		[]string{"U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"}); got != want {
		t.Errorf("getSteps2() = %v, want %v", got, want)
	}
}

func TestPart2Example02(t *testing.T) {
	want := 410
	if got := getSteps2([]string{"R98", "U47", "R26", "D63", "R33", "U87", "L62", "D20", "R33", "U53", "R51"},
		[]string{"U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"}); got != want {
		t.Errorf("getSteps2() = %v, want %v", got, want)
	}
}

func TestPart2(t *testing.T) {
	want := 101956
	if got := Part2("input.txt"); got != want {
		t.Errorf("Part2() = %v, want %v", got, want)
	}
}
