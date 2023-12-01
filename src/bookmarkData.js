export const createBookmark = async (id,user,category,name,poster_path) => {
    return {
        id: id,
        user: user,
        category: category,
        name: name,
        poster_path: poster_path
    };
};
export const deleteBookmark = async () => {
    return {};
};
