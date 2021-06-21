package day05

import "testing"

func TestPart1Example00(t *testing.T) {
	want := 5
	if got := processInstructions([]int{3, 0, 4, 0, 99}, 5); got != want {
		t.Errorf("processInstructions = %v, want %v", got, want)
	}
}

func TestPart1Example01(t *testing.T) {
	want := 0
	if got := processInstructions([]int{1002, 4, 3, 4, 33}, 5); got != want {
		t.Errorf("processInstructions = %v, want %v", got, want)
	}
}

func TestPart1(t *testing.T) {
	want := 4887191
	if got := Part1("input.txt", 1); got != want {
		t.Errorf("Part1() = %v, want %v", got, want)
	}
}

func TestPart2Example00(t *testing.T) {
	want := 1
	if got := processInstructions([]int{3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8}, 8); got != want {
		t.Errorf("processInstructions = %v, want %v", got, want)
	}
}
func TestPart2Example01(t *testing.T) {
	want := 1
	if got := processInstructions([]int{3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8}, 7); got != want {
		t.Errorf("processInstructions = %v, want %v", got, want)
	}
}

func TestPart2Example02(t *testing.T) {
	want := 1
	if got := processInstructions([]int{3, 3, 1108, -1, 8, 3, 4, 3, 99}, 8); got != want {
		t.Errorf("processInstructions = %v, want %v", got, want)
	}
}

func TestPart2Example03(t *testing.T) {
	want := 1
	if got := processInstructions([]int{3, 3, 1107, -1, 8, 3, 4, 3, 99}, 7); got != want {
		t.Errorf("processInstructions = %v, want %v", got, want)
	}
}

func TestPart2Example04(t *testing.T) {
	want := 999
	if got := processInstructions([]int{3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
		1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
		999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99}, 7); got != want {
		t.Errorf("processInstructions = %v, want %v", got, want)
	}
}

func TestPart2Example05(t *testing.T) {
	want := 1000
	if got := processInstructions([]int{3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
		1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
		999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99}, 8); got != want {
		t.Errorf("processInstructions = %v, want %v", got, want)
	}
}
func TestPart2Example06(t *testing.T) {
	want := 1001
	if got := processInstructions([]int{3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
		1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
		999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99}, 10); got != want {
		t.Errorf("processInstructions = %v, want %v", got, want)
	}
}

func TestPart2(t *testing.T) {
	want := 3419022
	if got := Part1("input.txt", 5); got != want {
		t.Errorf("Part1() = %v, want %v", got, want)
	}
}
