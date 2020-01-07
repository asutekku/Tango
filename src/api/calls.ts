export const http = <T>(request: RequestInfo): Promise<T> => {
    return new Promise((resolve) => {
        try {
            fetch(request)
                .then(response => response.json())
                .then(body => {
                    resolve(body);
                });
        } catch (e) {
            console.log(e);
        }
    });
};