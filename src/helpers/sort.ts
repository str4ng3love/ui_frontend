export const sortFits = (
  arr: {
    inactivePlayerCount: number;
    fitId: number;
    typeId: number;
    activeCharacterList: {
      charId: number;
      username: string;
      corpId: boolean;
    }[];
    inactiveCharacterList: {
      charId: number;
      username: string;
      corpId: boolean;
    }[];
    shipName: string;
    doctrine: string;
    fitName: string;
    totalPlayer: number;
    activePlayerCount: number;
  }[],
  sorter: string
) => {
  let sortedArr = [];
  if (sorter === "fit") {
    sortedArr = arr.sort((a, b) => a.fitName.localeCompare(b.fitName));
  } else if (sorter === "total") {
    sortedArr = arr.sort((a, b) => {
      if (a.totalPlayer > b.totalPlayer) {
        return 1;
      }
      if (a.totalPlayer < b.totalPlayer) {
        return -1;
      }
      return 0;
    });
  } else if (sorter === "active") {
    sortedArr = arr.sort((a, b) => {
      if (a.activePlayerCount > b.activePlayerCount) {
        return 1;
      }
      if (a.activePlayerCount < b.activePlayerCount) {
        return -1;
      }
      return 0;
    });
  } else if (sorter === "ships") {
    sortedArr = arr.sort((a, b) => a.shipName.localeCompare(b.shipName));
  } else {
    sortedArr = arr;
  }
  return sortedArr;
};

