'use client'
export const getFromSessionStorage = (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(key);  // Trả về giá trị hoặc null nếu không có dữ liệu
    }
    return null; 
  };
  