function logRequest(method, url) {
    const time = new Date().toLocaleString();  // ✅ Correct constructor: Date, not Data
    console.log(`[${time}] ${method} request to ${url}`);
}

module.exports = logRequest;
