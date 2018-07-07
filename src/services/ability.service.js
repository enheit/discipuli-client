export class Rule {
  constructor(actions, subject) {
    this.actions = actions;
    this.subject = subject;
  }

  add(action) {
    this.actions = [...this.actions, action];
  }

  has(action) {
    return this.actions.some(existingAction => existingAction === action);
  }
}

class Ability {
  constructor(abilities = []) {
    this.abilities = abilities;
  }

  update(abilities) {
    if (!Array.isArray(abilities)) {
      throw new Error('Expected an array');
    }

    this.abilities = abilities.map(rule => new Rule(rule.actions, rule.subject));
  }

  extend(ability) {
    this.abilities = [...this.abilities, ability];
  }

  getRule(subject) {
    return this.abilities.find(rule => rule.subject === subject);
  }

  exist(action, subject) {
    const rule = this.getRule(subject);

    return !!rule && rule.has(action);
  }

  can(action, subject) {
    const rule = this.getRule(subject);
    if (rule) {
      if (!rule.has(action)) {
        rule.add(action);
      }
    } else {
      this.extend(new Rule([action], subject));
    }
  }

  define(callback) {
    callback(this.can.bind(this));
  }
}

export default Ability;
