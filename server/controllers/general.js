import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // harded coded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transaction */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /*Overall Stats*/
    const overallStats = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStats[0];

    const thisMonthStat = overallStats[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStat = overallStats[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });
    res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      thisMonthStat,
      todayStat,
      transactions,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
