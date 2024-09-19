import { expect, test } from "vitest";
import secToMinSec from "../../src/lib/secToMinSec";

test("secToMinSec", () => {
  expect(secToMinSec(0)).toBe("00:00");
  expect(secToMinSec(100)).toBe("01:40");
  expect(secToMinSec(1000)).toBe("16:40");
  expect(secToMinSec(10000)).toBe("2:46:40");

  expect(secToMinSec(-0)).toBe("00:00");
  expect(secToMinSec(-100)).toBe("-01:40");
  expect(secToMinSec(-1000)).toBe("-16:40");
  expect(secToMinSec(-10000)).toBe("-2:46:40");

  expect(secToMinSec(1)).toBe("00:01");
  expect(secToMinSec(60)).toBe("01:00");
  expect(secToMinSec(3600)).toBe("1:00:00");
  expect(secToMinSec(7200)).toBe("2:00:00");

  expect(secToMinSec(-1)).toBe("-00:01");
  expect(secToMinSec(-60)).toBe("-01:00");
  expect(secToMinSec(-3600)).toBe("-1:00:00");
  expect(secToMinSec(-7200)).toBe("-2:00:00");

  expect(secToMinSec(59)).toBe("00:59");
  expect(secToMinSec(3599)).toBe("59:59");
  expect(secToMinSec(3661)).toBe("1:01:01");
  expect(secToMinSec(7322)).toBe("2:02:02");

  expect(secToMinSec(-59)).toBe("-00:59");
  expect(secToMinSec(-3599)).toBe("-59:59");
  expect(secToMinSec(-3661)).toBe("-1:01:01");
  expect(secToMinSec(-7322)).toBe("-2:02:02");

  expect(secToMinSec(86400)).toBe("24:00:00"); // 1 day
  expect(secToMinSec(172800)).toBe("48:00:00"); // 2 days

  expect(secToMinSec(-86400)).toBe("-24:00:00"); // - 1 day
  expect(secToMinSec(-172800)).toBe("-48:00:00"); // - 2 days
});
