const fetch = require('node-fetch');

// Hàm gửi yêu cầu GET
const fetchTimeKeepingHistory = async () => {
    try {
        const response = await fetch('http://192.168.1.2:3012/timekeepings', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODgyNzEyNSwianRpIjoiNjEzY2Y0ODctODU2OS00YTQ3LWJkNGUtMTcyMDk1MDRiNGVjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1aWQiOjYwLCJkZXBhcnRtZW50X2lkIjoxLCJkZXBhcnRtZW50X2NvZGUiOiJQQjEiLCJwb3NpdGlvbl9jb2RlIjoiTkhBTl9WSUVOIn0sIm5iZiI6MTc0ODgyNzEyNSwiZXhwIjoxNzgwMzYzMTI1fQ.N2_a0edCJ4SsBwVz38SDC1FMhkytEuYSEOb5Vk0H3OU',
                'Referer': 'http://192.168.1.2:3012/',
                'Cookie': 'AIPT_WEB_TIMEKEEPING_TOKEN=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODgyNzEyNSwianRpIjoiNjEzY2Y0ODctODU2OS00YTQ3LWJkNGUtMTcyMDk1MDRiNGVjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1aWQiOjYwLCJkZXBhcnRtZW50X2lkIjoxLCJkZXBhcnRtZW50X2NvZGUiOiJQQjEiLCJwb3NpdGlvbl9jb2RlIjoiTkhBTl9WSUVOIn0sIm5iZiI6MTc0ODgyNzEyNSwiZXhwIjoxNzgwMzYzMTI1fQ.N2_a0edCJ4SsBwVz38SDC1FMhkytEuYSEOb5Vk0H3OU',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
            },
            body: JSON.stringify({
                "approve_id": null,
                "description": null,
                "freetime": null,
                "status_approve": null,
                "status_keeping": 1,
                "type_keeping": 2,
                "user_id": 117
            })
        });

        if (!response.ok) {
            console.error('Error:', response.status);
        } else {
            const responseData = await response.json();
            console.log('Response:', responseData);
        }
    } catch (error) {
        console.error('Error occurred while fetching data:', error);
    }
};
// Hàm tính toán thời gian còn lại
const calculateTimeUntilNextRequest = () => {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(8, 14, 0, 0);

    if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    return targetTime - now;
};

// Hàm chạy báo log mỗi 10 giây
const startScheduledRequests = () => {
    let timeUntilTarget = calculateTimeUntilNextRequest();

    console.log(`Next POST request will be sent in ${timeUntilTarget / 1000 / 60} minutes`);

    // Cứ 10s log ra thời gian còn lại
    const intervalLogger = setInterval(() => {
        timeUntilTarget = calculateTimeUntilNextRequest();
        console.log(`Time left until 17:32: ${timeUntilTarget / 1000} seconds`);
    }, 30 * 60 * 1000);

    // Chạy setTimeout để gửi request vào 17:32
    setTimeout(() => {
        clearInterval(intervalLogger); // Dừng log
        fetchTimeKeepingHistory(); // Gửi request
        setInterval(fetchTimeKeepingHistory, 86400000); // Gửi request mỗi 24h
    }, timeUntilTarget);
};

// Bắt đầu quá trình
startScheduledRequests();
