class MathUtils {
  /**
   * Clamps a value between a minimum and maximum range.
   *
   * @param value - The value to be clamped.
   * @param min - The minimum value of the range.
   * @param max - The maximum value of the range.
   * @returns The clamped value.
   */
  static clamp(value: number, min?: number, max?: number): number {
    if (min !== undefined && value < min) {
      return min
    }
    if (max !== undefined && value > max) {
      return max
    }
    return value
  }

  /**
   * Normalizes a value within a given range.
   *
   * @param value - The value to be normalized.
   * @param min - The minimum value of the range.
   * @param max - The maximum value of the range.
   * @returns The normalized value.
   */
  static normalise(value: number, min: number, max: number): number {
    if (value < min || value > max) {
      value = MathUtils.clamp(value, min, max)
    }
    return (value - min) / (max - min)
  }
}

export default MathUtils
