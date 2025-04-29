router.get('/your-endpoint', async (req, res) => {
    try {
        // Your logic here
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: error.message 
        });
    }
});