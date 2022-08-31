

export const truncate = (str, limit) => {
    return (str.length > limit) ?
        str.substring(0, limit) + "..." : str;
};

