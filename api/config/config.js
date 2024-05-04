const Config = {
    SMTP: {
        HOST: "sandbox.smtp.mailtrap.io",
        PORT: 465,
        USER: "99484d5e69fb31",
        PASS: "43812bc9c1dd51",
        FROM: "noreply@test.com",
        TLS: false
    },
    DB: {
        PROTOCOL: "mongodb",
        HOST: "127.0.0.1",
        PORT: 27017,
        USER: "",
        PWD: "",
        NAME: "library"
    }
}

module.exports = Config; 