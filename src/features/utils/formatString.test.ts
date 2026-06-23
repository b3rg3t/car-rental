import { formatString } from "./formatString";

describe("formatString", () => {
    test("should replace value", () => {
        const newValue = "world";
        const defaultString = "Hello {0}";

        const val = formatString(defaultString, newValue);

        expect(val).toEqual("Hello world");
    });

    test("should not replace value", () => {
        const defaultString = "Hello {0}";

        const val = formatString(defaultString);

        expect(val).toEqual("Hello {0}");
    });

    test("should replace values", () => {
        const newValue = "world";
        const newValue2 = "from";
        const newValue3 = "David";

        const defaultString = "Hello {0} {1} {2}";

        const val = formatString(defaultString, newValue, newValue2, newValue3);

        expect(val).toEqual("Hello world from David");
    });
});
