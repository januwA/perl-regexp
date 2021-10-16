import rewire from "rewire"
const perl_regexp = rewire("./perl-regexp")
const handlePattern = perl_regexp.__get__("handlePattern")
const handleFlags = perl_regexp.__get__("handleFlags")
// @ponicode
describe("handlePattern", () => {
    test("0", () => {
        let callFunction: any = () => {
            handlePattern(false, "лв")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            handlePattern("\\\\\\^\\$\\.\\|\\?\\*\\+\\(\\)\\[", "£")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            handlePattern("(?P<first_group_name>.*)-(?P<second_group_name>.*)", "лв")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            handlePattern("(.*)-(.+)", "MT")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            handlePattern("(?:non-capturing)", "лв")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            handlePattern("", "")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("handleFlags", () => {
    test("0", () => {
        let callFunction: any = () => {
            handleFlags("(.*)-(.+)", "Hello, world!")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            handleFlags("(definition-(checksum|signature)\\s[\\w=\\/+]+)", "Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            handleFlags("(file format) ([a-zA-Z0-9_\\-]+)", "Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            handleFlags("definition-signature\\s(?P<signature>[\\w=\\/+]+)", "Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            handleFlags("(definition-(checksum|signature)\\s[\\w=\\/+]+)", "foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            handleFlags("", "")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("replace", () => {
    let inst: any

    beforeEach(() => {
        inst = new perl_regexp.PerlRegExp("(definition-(checksum|signature)\\s[\\w=\\/+]+)", "Anas")
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.replace("<?xml version=\"1.0\" ?>\n<a b=\"c\"/>\n", "elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst.replace("<?xml version=\"1.0\" ?>\n<a b=\"c\"/>\n", {})
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst.replace("<?xml version=\"1.0\" ?><a b=\"c\"/>", "elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst.replace("<?xml version=\"1.0\" ?>\n<a b=\"c\"/>\n", "Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst.replace("<?xml version=\"1.0\" ?><a b=\"c\"/>", {})
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst.replace("", {})
        }
    
        expect(callFunction).not.toThrow()
    })
})
