class LogManagerClient {
    constructor() {
        this.apiKey = null;
        this.appName = null;
        this.baseURL = null;
        this.isInitialized = false;
    }


    init(apiKey, appName, baseURL = 'http://localhost:5000/api') {
        if (!apiKey || !appName) {
            throw new Error('API key and application name are required');
        }

        this.apiKey = apiKey;
        this.appName = appName;
        this.baseURL = baseURL;
        this.isInitialized = true;

        console.log(`Log Manager initialized for app: ${appName}`);
        return this;
    }


    async log(message, level = 'INFO') {
        if (!this.isInitialized) {
            throw new Error('LogManager not initialized. Call init() first');
        }

        const validLevels = ['INFO', 'WARN', 'ERROR'];
        if (!validLevels.includes(level)) {
            throw new Error(`Invalid level: ${level}. Use one of: ${validLevels.join(', ')}`);
        }

        if (!message || typeof message !== 'string') {
            throw new Error('Message is required and must be a string');
        }

        try {
            const response = await fetch(`${this.baseURL}/applications/${this.appName}/logs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey
                },
                body: JSON.stringify({ message, level })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `HTTP ${response.status}`);
            }

            const data = await response.json();


            if (data.count > 1) {
                console.log(` Log updated: "${message}" (${level}) - Occurrence #${data.count}`);
            } else {
                console.log(` New log created: "${message}" (${level})`);
            }

            return data;
        } catch (error) {
            console.error(` Failed to send log: ${error.message}`);
            throw error;
        }
    }


    async info(message) {
        return this.log(message, 'INFO');
    }


    async warn(message) {
        return this.log(message, 'WARN');
    }


    async error(message) {
        return this.log(message, 'ERROR');
    }


    async batch(logs) {
        if (!Array.isArray(logs)) {
            throw new Error('Batch logs must be an array');
        }

        const results = [];
        for (const logItem of logs) {
            const result = await this.log(logItem.message, logItem.level);
            results.push(result);
        }
        return results;
    }


    getInfo() {
        return {
            isInitialized: this.isInitialized,
            appName: this.appName,
            baseURL: this.baseURL,
            apiKeyPrefix: this.apiKey ? `${this.apiKey.substring(0, 8)}...` : null
        };
    }
}

const Logger = new LogManagerClient();

export default Logger;
export { LogManagerClient };