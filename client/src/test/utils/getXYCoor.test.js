import { getXYCoor } from "../../utils/getXYCoor"


describe('getXYCoor', () => {
  it('converts a click position into percentages of the image', () => {
    const rect = { left: 150, top: 50, width: 1000, height: 500 }

    const result = getXYCoor(rect, 570, 300)

    expect(result).toEqual({ x: 42, y: 50 })
  })
})