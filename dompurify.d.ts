declare module 'dompurify' {
  const dompurify: {
    sanitize: (dirty: string | Node, config?: any) => string;
  };
  export default dompurify;
}
