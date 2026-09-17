export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const phone = req.query.phone || (req.body && req.body.phone);
    const count = req.query.count || (req.body && req.body.count) || 1;

    if (!phone) {
      return res.status(400).json({
        status: "error",
        message: "Phone number is required. Example: ?phone=3097508053&count=5",
        dev: "Ramzan Ahsan",
        group: "https://chat.whatsapp.com/FiZBn0BykHX47d1iHLOay1"
      });
    }

    // Target API Call
    const targetResponse = await fetch("https://huiyi67-ramzan-api.hf.space/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: String(phone),
        count: Number(count)
      })
    });

    const apiData = await targetResponse.json().catch(() => ({}));

    // Direct Exact Clean Response
    return res.status(200).json({
      status: apiData.status || "success",
      dev: "Ramzan Ahsan",
      group: "https://chat.whatsapp.com/FiZBn0BykHX47d1iHLOay1",
      job_id: apiData.job_id || null,
      message: apiData.message || "Request accepted"
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
      dev: "Ramzan Ahsan",
      group: "https://chat.whatsapp.com/FiZBn0BykHX47d1iHLOay1"
    });
  }
}
