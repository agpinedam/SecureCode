export const formatDate = (format: string): string => {
    const currentDate = new Date();
  
    return format
      .replace(/yyyy/g, currentDate.getFullYear().toString())
      .replace(/yy/g, String(currentDate.getFullYear()).slice(-2))
      .replace(/MM/g, String(currentDate.getMonth() + 1).padStart(2, '0'))
      .replace(/dd/g, String(currentDate.getDate()).padStart(2, '0'))
      .replace(/HH/g, String(currentDate.getHours()).padStart(2, '0'))
      .replace(/mm/g, String(currentDate.getMinutes()).padStart(2, '0'))
      .replace(/ss/g, String(currentDate.getSeconds()).padStart(2, '0'));
  };
  