export const mergeObjects = {

    isObject: function(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    },

    deep: function(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();

        if (mergeObjects.isObject(target) && mergeObjects.isObject(source)) {
            for (const key in source) {
                if (mergeObjects.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, {
                        [key]: {}
                    });
                    mergeObjects.deep(target[key], source[key]);
                } else {
                    Object.assign(target, {
                        [key]: source[key]
                    });
                }
            }
        }

        return mergeObjects.deep(target, ...sources);
    }
}