
const CheckInOut = require('../models/CheckInOut');

const checkIn = async (req, res) => {
  try {
    const { instructorId, checkInTime } = req.body;
    // Validate input

    // Create check-in record
    const checkInOut = new CheckInOut({
      instructor: instructorId,
      checkIn: new Date(checkInTime)
    });
    await checkInOut.save();

    res.status(201).json({ message: 'Check-in recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const checkOut = async (req, res) => {
  try {
    const { instructorId, checkOutTime } = req.body;
  console.log(req.body)

    // Find and update check-out record
    const checkInOut = await CheckInOut.findOneAndUpdate(
      { instructor: instructorId, checkOut: { $exists: false } },
      { checkOut: new Date(checkOutTime) },
      { new: true }
    );

    if (!checkInOut) {
      return res.status(404).json({ error: 'No matching check-in record found' });
    }

    res.json({ message: 'Check-out recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getMonthlyReport = async (req, res) => {
  try {
    const { instructorId, month, year } = req.body;

    // Calculate start and end dates for the given month and year
    const startDate = new Date(year, month - 1, 1); // Month is 0-based index
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Find all check-ins and check-outs for the given instructor within the specified month and year
    const checkInOutRecords = await CheckInOut.find({
      instructor: instructorId,
      checkIn: { $gte: startDate, $lte: endDate }
    });

    if (checkInOutRecords.length === 0) {
      return res.status(404).json({ error: 'No records found for the given month and year' });
    }

    // Calculate total checked-in time
    let totalCheckedInTime = 0;
    checkInOutRecords.forEach(record => {
      if (record.checkOut) {
        // Calculate the difference in milliseconds and add it to totalCheckedInTime
        totalCheckedInTime += record.checkOut.getTime() - record.checkIn.getTime();
      }
    });

    // Convert total checked-in time from milliseconds to hours (or any other desired format)
    totalCheckedInTime = totalCheckedInTime / (1000 * 60 * 60); // Convert milliseconds to hours

    res.json({ totalCheckedInTime: totalCheckedInTime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = {
  checkIn,
  checkOut,
  getMonthlyReport
};
