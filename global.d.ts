declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.svg' {
  const value: any;
  export default value;
}
