export const getEnvs = () => {
  const isProduction = !window?.location?.host?.includes('qa')
  const workspace = window?.location?.host?.split('.')[0]

  const vtexApiKey = isProduction ? 'vtexappkey-coppelar-VNNDPZ' : 'vtexappkey-qacoppelar-FYWMKV'
  const vtexApiToken = isProduction
    ? 'MLEBMSQRGEUNMMGBDFQKSMQYGFCNYDVOWMZIXRUWSKCNUUUORPEGSVEWBCEXLXDQBPMRZSZNWYHLTLYUJLTGLPUUEPJHKVJOWPCFHBNMVFZETJSMFRSIHJZTNXBFSXUN'
    : 'TOVVTWSLEFKVCCWRCILHDKRNVHUDXEAZZNFEYGNIYDGAYBHMFZLPEUFHGNMCJQPVJYRICHMHQYWFQNHPUIFBQEVOEPUPUCPHUQVXZVQVQGXMILYBJHKARVRDLEEMMNNR'
  const account = isProduction ? 'coppelar' : 'qacoppelar'

  return {
    account,
    isProduction,
    vtexApiKey,
    vtexApiToken,
    workspace,
  }
}
