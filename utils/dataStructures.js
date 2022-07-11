
// record for user details
export class Name {
  constructor(username, organization, orgid, website, phone, email, line1, line2, city, state, postalcode, country) {
    this.username = username;
    this.organization = organization;
    this.orgid = orgid;
    this.website = website;
    this.phone = phone;
    this.email = email;
    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.state = state;
    this.postalcode = postalcode;
    this.country = country;
  }
}

export class Generation {
  constructor() {
    this["Type"] = "Generation";
    this["Product identifier"] = "";
    this["File identifier"] = "";
    this["Filename"] = "";
    this["Description"] = "";
    this["Hash schema"] = "SHA256";
    this["Owner"] = "Unknown";
    this.color = "green";
  }
}

export class Processing {
  constructor() {
    this["Type"] = "Processing";
    this["Product identifier"] = "";
    this["File identifier"] = "";
    this["Filename"] = "";
    this["Description"] = "";
    this["Prior hash"] = ""
    this["Hash schema"] = "SHA256";
    this["Owner"] = "Unknown";
    this.color = "yellow";
  }
}

export class Merging {
  constructor() {
    this["Type"] = "Merging";
    this["Product identifier"] = "";
    this["File identifier"] = "";
    this["Filename"] = "";
    this["Description"] = "";
    this["Hash schema"] = "SHA256";
    this["Owner"] = ""
    this["Packaged files"] = {
      // should be a dict of type: class entries
    };
    this.color = "indigo";
  }
}

export class Packaging {
  constructor() {
    this["Type"] = "Packaging";
    this["Product identifier"] = "";
    this["File identifier"] = "";
    this["Filename"] = "";
    this["Description"] = "";
    this["Hash schema"] = "SHA256";
    this["Owner"] = ""
    this["Packaged files"] = {
      // should be a dict of type: class entries
    };
    this.color = "violet";
  }
}

export class Deletion {
  constructor() {
    this["Type"] = "Deletion";
    this["Product identifier"] = "";
    this["File identifier"] = "";
    this["Filename"] = "";
    this["Description"] = "";
    this["Hash schema"] = "SHA256";
    this["Owner"] = ""
    this["Corrections"] = {
      // should be a dict of type: class entries
    };
    this.color = "red";
  }
}

export class ProxyGeneration {
  constructor() {
    this["Type"] = "ProxyGeneration";
    this["Product identifier"] = "";
    this["File identifier"] = "";
    this["Filename"] = "";
    this["Description"] = "";
    this["Hash schema"] = "SHA256";
    this["Proposed owner"] = "Unknown";
    this.color = "lime";
  }
  
}

export class Correction {
  constructor() {
    this["Type"] = "Correction";
    this["Product identifier"] = "";
    this["File identifier"] = "";
    this["Filename"] = "";
    this["Description"] = "";
    this["Hash schema"] = "SHA256";
    this["Owner"] = ""
    this["Corrections"] = {
      // should be a dict of type: class entries
    };
    this.color = "pink";
  }
}
