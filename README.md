# zustand-benchmark

对比三个 react 状态库

- zustand
- jotai
- recoil

## 结论

- zustand 在打包大小和读写速度方面均有优势，并且写法上更简洁明了，自带 selector 能力，强烈**推荐**。
- jotai 在打包大小和读写速度方面与 zustand 差距不大，只是写法上样板代码更多。
- recoil 在打包大小和读写速度方面有严重的问题，强烈**不推荐**。

## 对比方式

主要从以下几个方面进行对比：

- 包体大小对比
  - 打包大小：使用 vite(rollup) 打包，将三个库经过 code split 拆分后每个文件的大小。
  - 打包大小（gzip）：同上，取 gzip 之后的大小。
- 性能对比
  - 读 1 次时间：在个人机器上，读取 1 次 store 数值所耗费的时间，用 console.time 输出。
  - 读 10000 次时间：同上。
  - 写 1 次时间：同上。
  - 写 10000 次时间：同上。

## 对比结果

| 对比项目        | zustand | jotai | recoil | context |
| --------------- | ------- | ----- | ------ | ------- |
| 打包大小        | 9.43    | 7.96  | 208.86 | -       |
| 打包大小(gzip)  | 3.54    | 3.05  | 66.36  | -       |
| 读 1 次时间     | 0.02    | 0.05  | 0.12   | 0.005   |
| 读 10000 次时间 | 8       | 20    | 229    | 0.9     |
| 写 1 次时间     | 0.03    | 0.1   | 0.2    | 0.05    |
| 写 10000 次时间 | 7       | 58    | 88     | 30      |
