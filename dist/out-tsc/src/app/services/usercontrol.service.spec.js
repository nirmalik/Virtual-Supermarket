"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var usercontrol_service_1 = require("./usercontrol.service");
describe('UsercontrolService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [usercontrol_service_1.UsercontrolService]
        });
    });
    it('should be created', testing_1.inject([usercontrol_service_1.UsercontrolService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=usercontrol.service.spec.js.map