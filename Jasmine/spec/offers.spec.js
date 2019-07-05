describe("test offers init", function() {
    it("Offers should be initiated", function() {
        expect(Offers.sessionData).not.toBe(null)
    });
});

describe("testing page ips", function() {
    it("getIps should return interaction points with valid dynamic offer class", function() {
        Offers.getIps();
        let testIps = [];
        testIps.push("tf-headerfooter-hb");
        expect(Offers.sessionData.ips).toEqual(testIps)
    });

    it("a div without the dynamic offer class shoud not add the id even if it's a valid one",function() {
        expect(Offers.sessionData.ips).not.toContain("tf-search-hbr")
    });

    it("a div without the dynamic offer class shoud not add the id even if it's a valid one",function() {
        Offers.offersRequired();
        expect(Offers.sessionData.ips).not.toContain("tf-search-hbr")
    });
});
