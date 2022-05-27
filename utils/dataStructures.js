
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
  constructor(id, filename, description, fileHash, hashSchema) {
    this.id = id;
    this.type = "Generation";
    this.filename = filename;
    this.description = description;
    this.fileHash = fileHash;
    this.hashSchema = hashSchema;
  }
}

export class Processing {
  constructor(id, filename, description, fileHash, priorFileHash, hashSchema) {
    this.id = id;
    this.type = "Processing";
    this.filename = filename;
    this.description = description;
    this.fileHash = fileHash;
    this.priorFileHash = priorFileHash;
    this.hashSchema = hashSchema;
  }
}

export class Merging {
  constructor(id, filename, descrption, filehash, priorFileHash, hashSchema, inputsList) {
    this.id = "";
    this.type = "Merging";
    this.filename = "";
    this.description = "";
    this.fileHash = "";
    this.priorFileHash = "";
    this.hashSchema = "";
    this.inputs = inputsList;
  }
}

export class Packaging {
  constructor(id, filename, description, fileHash, priorFileHash, hashSchema, inputsList) {
    this.id = id;
    this.type = "Packaging";
    this.filename = filename;
    this.description = description;
    this.fileHash = fileHash;
    this.priorFileHash = priorFileHash;
    this.hashSchema = hashSchema;
    this.inputs = inputsList; // should be a list of hashes and id tuples
  }
}

export class Deletion {
  constructor(id, filename, descrption, fileHash, priorFileHash, hashSchema, inputsList) {
    this.id = id;
    this.type = "Deletion";
    this.filename = filename;
    this.description = description;
    this.fileHash = fileHash;
    this.priorFileHash = priorFileHash;
    this.hashSchema = hashSchema;
      // should be a list of hashes and id tuples
      // if, for example, files in a package are removed
    this.inputs = inputsList;
  }
}

export class ProxyGeneration {
  constructor(id, filename, description, fileHash, hashSchema, proposedOwner) {
    this.id = "";
    this.type = "ProxyGeneration";
    this.filename = "";
    this.description = "";
    this.fileHash = "";
    this.hashSchema = "";
    this.proposedOwner = "";
  }
}

export class Correction {
  constructor(id, filename, description, fileHash, hashSchema, corrections) {
    this.id = "";
    this.type = "Correction";
    this.filename = "";
    this.description = "";
    this.fileHash = "";
    this.hashSchema = "";
    this.corrections = {
      // should be a dict of type: class entries
    };
  }
}
