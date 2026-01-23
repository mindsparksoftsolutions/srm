
import http from 'http';
import https from 'https';

const URL_TO_TEST = 'https://srm-registration.vedhamsmidway.com/';
const TOTAL_REQUESTS = 10000;
const CONCURRENCY = 1000;

const makeRequest = () => {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const lib = URL_TO_TEST.startsWith('https') ? https : http;

        const req = lib.get(URL_TO_TEST, (res) => {
            let data = '';
            res.on('data', () => { }); // Consume stream
            res.on('end', () => {
                const duration = Date.now() - startTime;
                resolve({
                    statusCode: res.statusCode,
                    duration: duration
                });
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.end();
    });
};

const runLoadTest = async () => {
    console.log(`Starting load test on ${URL_TO_TEST}`);
    console.log(`Total Requests: ${TOTAL_REQUESTS}`);
    console.log(`Concurrency: ${CONCURRENCY}`);

    let completed = 0;
    let success = 0;
    let failed = 0;
    let totalDuration = 0;
    const errors = [];

    const batchSize = CONCURRENCY;
    const batches = Math.ceil(TOTAL_REQUESTS / batchSize);

    for (let i = 0; i < batches; i++) {
        const promises = [];
        const remaining = TOTAL_REQUESTS - completed;
        const currentBatchSize = Math.min(batchSize, remaining);

        for (let j = 0; j < currentBatchSize; j++) {
            promises.push(makeRequest().then(res => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    success++;
                } else {
                    failed++;
                }
                totalDuration += res.duration;
                process.stdout.write('.');
            }).catch(err => {
                failed++;
                errors.push(err.message);
                process.stdout.write('x');
            }));
        }

        await Promise.all(promises);
        completed += currentBatchSize;
    }

    console.log('\n\n--- Load Test Results ---');
    console.log(`Total Requests: ${completed}`);
    console.log(`Successful: ${success}`);
    console.log(`Failed: ${failed}`);
    if (completed > 0) {
        console.log(`Average Duration: ${(totalDuration / completed).toFixed(2)} ms`);
    } else {
        console.log('No requests completed.');
    }

    if (errors.length > 0) {
        console.log('\nErrors encountered:');
        console.log(errors.slice(0, 5)); // Show first 5 errors
        if (errors.length > 5) console.log(`... and ${errors.length - 5} more.`);
    }
};

runLoadTest();
