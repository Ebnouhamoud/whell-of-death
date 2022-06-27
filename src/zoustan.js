import create from "zustand";

const createData = (name, count) => {
  return { name, count, color: randomColor() };
};

const randomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};

const useStore = create((set) => ({
  users: [
    createData("Firnas", 1),
    createData("Rob", 1),
    createData("Nathan", 1),
    createData("Gerry", 1),
    createData("Bianca", 1),
    createData("Karthika", 1),
    createData("Natasha", 1),
    createData("Ranjan", 1),
    createData("Jimmy", 1),
    createData("Alessandro", 1),
    createData("Hamoud", 1),
    createData("Ranjan Mustache", 1),
  ],
  isFocused: false,
  isSpinning: false,
  setIsSpinning: (bool) => set((state) => ({ isSpinning: bool })),
  setIsFocused: () => set((state) => ({ isFocused: !state.isFocused })),
  addUser: (userInput) => {
    if (userInput == "") return;
    const newUser = createData(userInput, 1);
    set((state) => ({ users: [...state.users, newUser] }));
  },
  removeUser: (index) => {
    set((state) => {
      if (state.users.length <= 0) return;
      const newUsers = [...state.users];
      newUsers.splice(index, 1);
      return { users: newUsers };
    });
  },
  changeCount: (index, direction) => {
    set((state) => {
      const newUsers = [...state.users];
      if (direction === "plus" && newUsers[index].count < 9)
        newUsers[index].count += 1;
      if (direction === "negative" && newUsers[index].count > 1)
        newUsers[index].count -= 1;
      return { users: newUsers };
    });
  },
}));

export default useStore;
