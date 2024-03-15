const express = require('express');
const assemblyRoutes = require('./routes/assemblyRoutes');
const pollRoutes = require('./routes/pollRoutes');
const issueRoutes = require('./routes/issueRoutes');
const otpRoutes = require('./routes/otpRoutes');
const app = express();
const cors = require('cors')
// Middleware
app.use(cors());

// Routes
app.use('/api/assembly', assemblyRoutes);
app.use('/api/poll', pollRoutes);
app.use('/api/issue', issueRoutes);
app.use('/api/otp', otpRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
