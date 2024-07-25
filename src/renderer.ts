document.addEventListener('DOMContentLoaded', () => {
  const fetchTimeButton = document.getElementById('fetch-time') as HTMLButtonElement;
  const timeDisplay = document.getElementById('time-display') as HTMLDivElement;
  const setTimeInput = document.getElementById('set-time') as HTMLInputElement;
  const setTimeButton = document.getElementById('set-time-button') as HTMLButtonElement;

  fetchTimeButton.addEventListener('click', async () => {
      try {
          const time = await window.api.fetchTime();
          timeDisplay.textContent = `Current time: ${time}`;
      } catch (error) {
          console.error('Error fetching time:', error);
      }
  });

  setTimeButton.addEventListener('click', async () => {
      const time = setTimeInput.value;
      try {
          await window.api.setTime(time);
          timeDisplay.textContent = `Time set to: ${time}`;
      } catch (error) {
          console.error('Error setting time:', error);
      }
  });
});
