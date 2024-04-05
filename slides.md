---
theme: default
title: Genetic Algorithm
info: |
  ## by Dimitar Banev F95107
class: text-center
highlighter: shiki
drawings:
  persist: false
  enabled: false
transition: slide-left
mdc: true
---

# Генетичен Алгоритъм

Изготвено от Димитър Банев F95107

---
transition: fade-out
---
# Какво е генетичен алгоритъм?

- Вдъхновен от еволюционната теория и принципите на естествения отбор
- Основни компоненти на алгоритъма
  - Популация
  - Функция за Оценка (фитнес функция)
  - Селекция - подбор на родителите на база тяхната оценка
  - Кръстосване
  - Мутация - случайни промени в генетичния код
  - Елитизъм - най-добрите индивиди преминават в следващо поколение

---
transition: fade-out
---

# Моята имплементация

Заселване на n брой семейства(фамилии) с m брой членове на семейството в изолирано селище. Наблюдаване кои фамилии ще нарастнат с времето и кои ще изчезнат.

- Жените приемат фамилията на мъжете, т.е. ако дадена фамилия има само наследници от нежният пол - то фамилията ще изчезне.
- Без кръвосмешения
- Размножаване само с противоположният пол
- Мъжете с по-висок фитнес имат предимство
- Риск за загуба на потомството при всеки (при хората с по-висок фитнес е по-малко)

---
transition: fade-out
---
# Популация / Входящи Данни

Генериране на членовете на семейството и техните качества (пол, гени, фитнес) е на случаен принцип (първоначално). Поколението ще споделя гени с родителите си.

```ts
  set member(member: Member) {
    if (member.gender === "male") {
      this.members["males"].push(member);
    }

    if (member.gender === "female") {
      this.members["females"].push(member);
    }
  }

  #init = () => {
    for (let i = 0; i < FAMILY_SIZE; i++) {
      const member = new Member(useGenes(10), ["God", "God"], this.name);

      this.member = member;
    }
  };
```

---
transition: fade-out
---

# Селекция

- Всички мъже и жени са сортирани спрямо техният фитнес
- По-добър фитнес = по-голям шанс за поколение

```ts
import type { Member } from "../entities/Member";

export function useSelection(
  male: Member,
  females: Exclude<Member, { gender: "male" }>[]
) {
  for (const [femaleIdx, female] of females.entries()) {
    if (male.family === female.family) continue;
    else if (
      male.parents.every(
        (el, idx) => el !== "God" && el === female.parents[idx]
      )
    )
      continue;
    else {
      const fertilityChance =
        Math.floor(Math.random() * 10) <
        Math.floor((male.fitness + female.fitness) / 2);

      return { female, femaleIdx, fertilityChance };
    }
  }
  return false;
}
```

---
transition: fade-out
---

# Кръстосване

- Взима се точка на пресичане на случаен принцип

```ts
export const useCrossOver = (m: Member, f: Member) => {
  const rand = Math.floor(
    (Math.random() * m.genes.length) / 2 + (Math.random() * f.genes.length) / 2
  );

  const motherGenes = [...m.genes.slice(0, rand), ...f.genes.slice(rand)];
  const fatherGenes = [...f.genes.slice(0, rand), ...m.genes.slice(rand)];

  return { motherGenes, fatherGenes };
};
```
---
transition: fade-out
---

# Мутация

- На случаен принцип (10% шанс) може да се случи мутация на ген

```ts
export const useMutation = (genes: number[]) => {
  const genesCopy = [...genes];
  const prob = Math.floor(Math.random() * 100 + 1);
  if (prob <= 10) {
    const idx = Math.floor(Math.random() * genesCopy.length);
    genesCopy[idx] = Math.abs(genesCopy[idx] - 1);
  }

  return genesCopy;
};
```

---
transition: fade-out
---

# Демо

Иницийлизиращи данни

---
transition: fade-out
---
