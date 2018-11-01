"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var admin_store_guard_1 = require("./admin-store.guard");
describe('AdminStoreGuard', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [admin_store_guard_1.AdminStoreGuard]
        });
    });
    it('should ...', testing_1.inject([admin_store_guard_1.AdminStoreGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=admin-store.guard.spec.js.map