"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var canactivate_guard_1 = require("./canactivate.guard");
describe('CanactivateGuard', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [canactivate_guard_1.CanactivateGuard]
        });
    });
    it('should ...', testing_1.inject([canactivate_guard_1.CanactivateGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=canactivate.guard.spec.js.map