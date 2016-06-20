module.exports = {
  // center posisition of each pin
  pinDefaultPWM: [
  [ 1540, 1500, 1540 ],
  [ 1460, 1640, 1480 ],
  [ 1385, 1480, 1540 ],
  [ 1450, 1550, 1420 ],
  [ 1470, 1540, 1460 ],
  [ 1400, 1580, 1540 ]
  ],
  // leg <=> pin mapping
  pinMap: [
    [2, 4, 6], // 1
    [0, 3, 1], // 2
    [17, 7, 5], // 3
    [8, 16, 10], // 4
    [12, 15, 14], // 5
    [13, 9, 11], // 6
  ],
  stepDelay: 15,
  switchSteps: 3,
}