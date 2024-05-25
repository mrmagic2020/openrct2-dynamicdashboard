import Logger from "./logger"

namespace MathUtils {
  /**
   * Clamps a value between a minimum and maximum range.
   *
   * @param value - The value to be clamped.
   * @param min - The minimum value of the range.
   * @param max - The maximum value of the range.
   * @returns The clamped value.
   */
  export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }

  /**
   * Normalizes a value within a given range.
   *
   * @param value - The value to be normalized.
   * @param min - The minimum value of the range.
   * @param max - The maximum value of the range.
   * @returns The normalized value.
   */
  export function normalise(value: number, min: number, max: number): number {
    Logger.assert(
      value >= min && value <= max,
      `Value ${value} is out of range ${min} - ${max}. Using clamped value.`
    )
    value = clamp(value, min, max)
    return (value - min) / (max - min)
  }
}

export default MathUtils
