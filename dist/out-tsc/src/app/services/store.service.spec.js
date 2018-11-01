"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var store_service_1 = require("./store.service");
describe('StoreService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [store_service_1.StoreService]
        });
    });
    it('should be created', testing_1.inject([store_service_1.StoreService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=store.service.spec.js.map