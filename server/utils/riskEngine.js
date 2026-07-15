function calculateRisk(user, alerts, auditLogs) {

    let score = 0;

    // =====================
    // Failed Login Attempts
    // =====================

    score += user.failedLoginAttempts * 20;

    if (user.failedLoginAttempts >= 3) {

        score += 15;

    }

    // =====================
    // Admin Privileges
    // =====================

    if (user.role === "Admin") {

        score += 10;

    }

    // =====================
    // Alerts
    // =====================

    alerts.forEach(alert => {

        switch (alert.riskLevel) {

            case "Low":

                score += 10;

                break;

            case "Medium":

                score += 20;

                break;

            case "High":

                score += 35;

                break;

            case "Critical":

                score += 50;

                break;

        }

        if (alert.status === "Resolved") {

            score -= 20;

        }

        if (
            alert.alertType
            ?.toLowerCase()
            .includes("unauthorized")
        ) {

            score += 25;

        }

    });

    // =====================
    // Audit Logs
    // =====================

    auditLogs.forEach(log => {

        if (log.status === "Failed") {

            score += 10;

        }

    });

    // =====================
    // Limit
    // =====================

    if (score < 0) score = 0;

    if (score > 100) score = 100;

    // =====================
    // Risk Level
    // =====================

    let level = "Low";

    if (score >= 75)

        level = "Critical";

    else if (score >= 50)

        level = "High";

    else if (score >= 25)

        level = "Medium";

    return {

        score,

        level,

    };

}

module.exports = calculateRisk;