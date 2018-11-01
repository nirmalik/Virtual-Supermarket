"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var validators_service_1 = require("./validators.service");
describe('ValidatorsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [validators_service_1.ValidatorsService]
        });
    });
    it('should be created', testing_1.inject([validators_service_1.ValidatorsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=validators.service.spec.js.map