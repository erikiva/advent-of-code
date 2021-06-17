package day04

import "testing"

func TestPart1Example00(t *testing.T) {
	want := true
	if got := isValid("111111"); got != want {
		t.Errorf("isValid(111111) = %v, want %v", got, want)
	}
}

func TestPart1Example01(t *testing.T) {
	want := false
	if got := isValid("223450"); got != want {
		t.Errorf("isValid(223450) = %v, want %v", got, want)
	}
}

func TestPart1Example02(t *testing.T) {
	want := false
	if got := isValid("123789"); got != want {
		t.Errorf("isValid(123789) = %v, want %v", got, want)
	}
}

func TestPart1(t *testing.T) {
	want := 889
	if got := Part1(307237, 769058); got != want {
		t.Errorf("Part1() = %v, want %v", got, want)
	}
}

func TestPart2Example00(t *testing.T) {
	want := false
	if got := isValid2("123444"); got != want {
		t.Errorf("isValid2(123444) = %v, want %v", got, want)
	}
}

func TestPart2Example01(t *testing.T) {
	want := true
	if got := isValid2("111122"); got != want {
		t.Errorf("isValid2(111122) = %v, want %v", got, want)
	}
}

func TestPart2(t *testing.T) {
	want := 589
	if got := Part2(307237, 769058); got != want {
		t.Errorf("Part2() = %v, want %v", got, want)
	}
}
