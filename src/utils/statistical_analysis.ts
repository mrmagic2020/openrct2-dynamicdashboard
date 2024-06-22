class StatisticalAnalysis {
  private _data: number[]

  private _max?: number
  private _min?: number
  private _q1?: number
  private _q3?: number
  private _mean?: number
  private _median?: number
  private _mode?: number[]
  private _range?: number
  private _variance?: number
  private _standardDeviation?: number

  private clearCache(): void {
    this._max = undefined
    this._min = undefined
    this._q1 = undefined
    this._q3 = undefined
    this._mean = undefined
    this._median = undefined
    this._mode = undefined
    this._range = undefined
    this._variance = undefined
    this._standardDeviation = undefined
  }

  constructor(data: number[]) {
    this._data = data
  }

  get max(): number {
    if (this._max) return this._max

    this._max = Math.max(...this._data)
    return this._max
  }

  get min(): number {
    if (this._min) return this._min

    this._min = Math.min(...this._data)
    return this._min
  }

  get q1(): number {
    if (this._q1) return this._q1

    const sortedData = this._data.sort((a, b) => a - b)
    const mid = Math.floor(sortedData.length / 2)
    this._q1 = new StatisticalAnalysis(sortedData.slice(0, mid)).median
    return this._q1
  }

  get q3(): number {
    if (this._q3) return this._q3

    const sortedData = this._data.sort((a, b) => a - b)
    const mid = Math.floor(sortedData.length / 2)
    this._q3 = new StatisticalAnalysis(
      sortedData.slice(mid + (sortedData.length % 2))
    ).median
    return this._q3
  }

  get mean(): number {
    if (this._mean) return this._mean

    const sum = this._data.reduce((acc, curr) => acc + curr, 0)
    this._mean = sum / this._data.length
    return this._mean
  }

  get median(): number {
    if (this._median) return this._median

    const sortedData = this._data.sort((a, b) => a - b)
    const mid = Math.floor(sortedData.length / 2)
    this._median =
      sortedData.length % 2 !== 0
        ? sortedData[mid]
        : (sortedData[mid - 1] + sortedData[mid]) / 2
    return this._median
  }

  get mode(): number[] {
    if (this._mode) return this._mode
    if (this._data.length === 0) return []

    let frequency: { [key: number]: number } = {}
    let maxFrequency = 0
    let modes: number[] = []

    for (let i = 0; i < this._data.length; i++) {
      const num = this._data[i]
      frequency[num] = (frequency[num] || 0) + 1
      if (frequency[num] > maxFrequency) {
        maxFrequency = frequency[num]
        modes = [num]
      } else if (frequency[num] === maxFrequency) {
        modes.push(num)
      }
    }

    // No mode if all numbers are equally frequent
    if (modes.length === this._data.length) {
      modes = []
    }

    this._mode = modes
    return this._mode
  }

  get range(): number {
    if (this._range) return this._range

    const sortedData = this._data.sort((a, b) => a - b)
    this._range = sortedData[sortedData.length - 1] - sortedData[0]
    return this._range
  }

  get variance(): number {
    if (this._variance) return this._variance

    const mean = this.mean
    const sum = this._data.reduce((acc, curr) => acc + (curr - mean) ** 2, 0)
    this._variance = sum / this._data.length
    return this._variance
  }

  get standardDeviation(): number {
    if (this._standardDeviation) return this._standardDeviation

    this._standardDeviation = Math.sqrt(this.variance)
    return this._standardDeviation
  }

  push(data: number | number[]): void {
    if (Array.isArray(data)) {
      this._data.push(...data)
    } else {
      this._data.push(data)
    }
    this.clearCache()
  }

  update(data: number[]): void {
    this._data = data
    this.clearCache()
  }
}

export default StatisticalAnalysis
