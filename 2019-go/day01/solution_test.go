package day01

import "testing"

func TestPart1Example01(t *testing.T) {
	want := 2
	if got := calculateFuel(12); got != want {
		t.Errorf("calculateFuel() = %v, want %v", got, want)
	}
}

func TestPart1Example02(t *testing.T) {
	want := 2
	if got := calculateFuel(14); got != want {
		t.Errorf("calculateFuel() = %v, want %v", got, want)
	}
}

func TestPart1Example03(t *testing.T) {
	want := 654
	if got := calculateFuel(1969); got != want {
		t.Errorf("calculateFuel() = %v, want %v", got, want)
	}
}

func TestPart1Example04(t *testing.T) {
	want := 33583
	if got := calculateFuel(100756); got != want {
		t.Errorf("calculateFuel() = %v, want %v", got, want)
	}
}

func TestPart1(t *testing.T) {
	want := 3182375
	if got := Part1("input.txt"); got != want {
		t.Errorf("Part1() = %v, want %v", got, want)
	}
}

func TestPart2Example01(t *testing.T) {
	want := 2
	if got := calculateTotalFuel(12); got != want {
		t.Errorf("calculateTotalFuel() = %v, want %v", got, want)
	}
}

func TestPart2Example02(t *testing.T) {
	want := 2
	if got := calculateTotalFuel(14); got != want {
		t.Errorf("calculateTotalFuel() = %v, want %v", got, want)
	}
}

func TestPart2Example03(t *testing.T) {
	want := 966
	if got := calculateTotalFuel(1969); got != want {
		t.Errorf("calculateTotalFuel() = %v, want %v", got, want)
	}
}

func TestPart2Example04(t *testing.T) {
	want := 50346
	if got := calculateTotalFuel(100756); got != want {
		t.Errorf("calculateTotalFuel() = %v, want %v", got, want)
	}
}

func TestPart2(t *testing.T) {
	want := 4770725
	if got := Part2("input.txt"); got != want {
		t.Errorf("Part2() = %v, want %v", got, want)
	}
}
