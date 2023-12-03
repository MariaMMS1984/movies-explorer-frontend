
export default function searchFilter(array, inputSearch, tumbler) {
    if (!array) {
        return [];
    }

    let filtered = [...array];

    if (inputSearch) {
        filtered = filtered.filter((element) => element.nameRU
            .toLowerCase()
            .includes(inputSearch.toLowerCase()));
    }

    if (tumbler) {
        return filtered.filter((element) => element.duration <= 40);
    }

    return filtered;
}