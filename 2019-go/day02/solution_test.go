package day02

import "testing"

func TestPart1Example01(t *testing.T) {
	want := 3500
	if got := processIntcode([]int{1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50}); got != want {
		t.Errorf("processIntcode() = %v, want %v", got, want)
	}
}

func TestPart1Example02(t *testing.T) {
	want := 2
	if got := processIntcode([]int{1, 0, 0, 0, 99}); got != want {
		t.Errorf("processIntcode() = %v, want %v", got, want)
	}
}

func TestPart1Example03(t *testing.T) {
	want := 2
	if got := processIntcode([]int{2, 3, 0, 3, 99}); got != want {
		t.Errorf("processIntcode() = %v, want %v", got, want)
	}
}

func TestPart1Example04(t *testing.T) {
	want := 2
	if got := processIntcode([]int{2, 4, 4, 5, 99, 0}); got != want {
		t.Errorf("processIntcode() = %v, want %v", got, want)
	}
}

func TestPart1Example05(t *testing.T) {
	want := 30
	if got := processIntcode([]int{1, 1, 1, 4, 99, 5, 6, 0, 99}); got != want {
		t.Errorf("processIntcode() = %v, want %v", got, want)
	}
}

func TestPart1(t *testing.T) {
	want := 7210630
	if got := Part1("input.txt"); got != want {
		t.Errorf("Part1() = %v, want %v", got, want)
	}
}

func TestPart2(t *testing.T) {
	want := 3892
	if got := Part2("input.txt"); got != want {
		t.Errorf("Part2() = %v, want %v", got, want)
	}
}
