class Org {
    constructor(id, name, account, website, fuelReimbursementPolicy = '1000', speedLimitPolicy, parentOrgId = null) {
        this.id = id;
        this.name = name;
        this.account = account;
        this.website = website;
        this.fuelReimbursementPolicy = fuelReimbursementPolicy;
        this.speedLimitPolicy = speedLimitPolicy;
        this.parentOrgId = parentOrgId;
    }
}

module.exports = Org;