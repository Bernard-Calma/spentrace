export const loadDemoState = () => {
  try {
    const data = localStorage.getItem("demo-state");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading demo state:", error);
    return null;
  }
};

export const saveDemoState = (state: any) => {
  try {
    localStorage.setItem("demo-state", JSON.stringify(state.demo));
  } catch (error) {
    console.error("Error saving demo state:", error);
  }
};

export const clearDemoState = () => {
  try {
    localStorage.removeItem("demo-state");
  } catch (error) {
    console.error("Error clearing demo state:", error);
  }
};
