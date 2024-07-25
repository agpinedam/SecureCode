interface Window {
  api: {
    fetchTime: () => Promise<string>;
    setTime: (time: string) => Promise<void>;
  };
}
